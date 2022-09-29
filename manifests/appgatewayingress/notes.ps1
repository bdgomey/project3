AZURE_TENANT_ID="33da9f3f-4c1a-4640-8ce1-3f63024aea1d"
AZURE_CLIENT_ID="54bf37fa-1d15-4a0c-a461-d9502420a7a8"
AZURE_CLIENT_SECRET="3ZO~o2f3bvGYqQpa~3_ZXke~o258M1~44x"
AZURE_SUBSCRIPTION_ID="f6a7723b-56ed-4572-a4b2-0f147ad4fd1b"
AZURE_OBJECT_ID="b65c5a26-0091-4405-9151-2653f9c6827a"

cat <<EOF > parameters.json
{
  "aksServicePrincipalAppId": { "value": "$AZURE_CLIENT_ID" },
  "aksServicePrincipalClientSecret": { "value": "$AZURE_CLIENT_SECRET" },
  "aksServicePrincipalObjectId": { "value": "$AZURE_OBJECT_ID" },
  "aksEnableRBAC": { "value": false }
}
EOF

$resourceGroupName="project3appgw"

$location="eastus"

$deploymentName="ingressproject3"

az group create -n $resourceGroupName -l $location

az group deployment create -g $resourceGroupName -n $deploymentName --template-file template.json --parameters parameters.json

applicationGatewayName=$(jq -r ".applicationGatewayName.value" deployment-outputs.json)
resourceGroupName=$(jq -r ".resourceGroupName.value" deployment-outputs.json)
subscriptionId=$(jq -r ".subscriptionId.value" deployment-outputs.json)
identityClientId=$(jq -r ".identityClientId.value" deployment-outputs.json)
$identityId=$(jq -r ".identityResourceId.value" deployment-outputs.json)


helm install ingress-azure `
  -f helm-config.yaml `
  application-gateway-kubernetes-ingress/ingress-azure `
  --version 1.5.0


$aksName="aks1d9e"
$clusterClientId=$(az aks show -g $resourceGroup -n $aksName -o tsv --query "servicePrincipalProfile.clientId")

az role assignment create `
--role "Managed Identity Operator" `
--assignee $clusterClientId `
--scope $identityId `