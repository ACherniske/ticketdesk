import requests

# GitHub token and API URL
GH_TOKEN = "token"
GH_GRAPHQL_URL = "https://github.iiviad.com/api/graphql"
HEADERS = {
    'Authorization': f'Bearer {GH_TOKEN}',
    'Content-Type': 'application/json',
}

def fetch_project_config(organization_login: str, project_number: int):
    query = '''
    query($organizationLogin: String!, $projectNumber: Int!) {
      organization(login: $organizationLogin) {
        projectV2(number: $projectNumber) {
          id
          title
          fields(first: 100) {
            nodes {
              __typename
              ... on ProjectV2Field {
                id
                name
              }
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
    '''
    variables = {
        "organizationLogin": organization_login,
        "projectNumber": project_number
    }
    
    response = requests.post(
        GH_GRAPHQL_URL,
        json={"query": query, "variables": variables},
        headers=HEADERS,
        verify=False  # SSL verification temporarily disabled for debugging
    )
    
    if response.status_code == 200:
        data = response.json()
        project_info = data.get("data", {}).get("organization", {}).get("projectV2", {})
        
        print("\nProject Information:")
        print(f"Title: {project_info.get('title')}")
        print(f"Project ID: {project_info.get('id')}")
        
        print("\nFields and Options:")
        fields = project_info.get("fields", {}).get("nodes", [])
        for field in fields:
            print(f"Field Type: {field.get('__typename')}")
            print(f"Field Name: {field.get('name')}")
            print(f"Field ID: {field.get('id')}")
            
            # Check for dropdown options (specific to ProjectV2SingleSelectField)
            if field.get("__typename") == "ProjectV2SingleSelectField":
                print("  Dropdown Options:")
                for option in field.get("options", []):
                    print(f"    Option Name: {option.get('name')}, Option ID: {option.get('id')}")
    else:
        print(f"Error: {response.status_code}, {response.text}")

# Organization login and project number
organization_login = "Bloomfield"
project_number = 1

# Call the function
fetch_project_config(organization_login, project_number)
