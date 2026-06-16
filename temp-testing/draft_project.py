
import requests

# GitHub token and API URL
GH_TOKEN = "token"
GH_GRAPHQL_URL = "https://github.iiviad.com/api/graphql"
HEADERS = {
    "Authorization": f"Bearer {GH_TOKEN}",
    "Content-Type": "application/json",
}

def create_draft_issue(project_id, title, body):
    """
    Creates a draft issue in the specified ProjectV2.
    :param project_id: The ID of the ProjectV2.
    :param title: Title of the draft issue.
    :param body: Body content for the draft issue, provided in Markdown format.
    :return: Returns the ID of the created project item.
    """
    query = """
    mutation($projectId: ID!, $title: String!, $body: String!) {
        addProjectV2DraftIssue(input: {projectId: $projectId, title: $title, body: $body}) {
            projectItem {
                id
            }
        }
    }
    """
    variables = {
        "projectId": project_id,
        "title": title,
        "body": body
    }
    response = requests.post(
        GH_GRAPHQL_URL,
        json={"query": query, "variables": variables},
        headers=HEADERS,
        verify=False  # Disable SSL verification temporarily for debugging
    )
    if response.status_code == 200:
        data = response.json()
        project_item = data.get("data", {}).get("addProjectV2DraftIssue", {}).get("projectItem", {})
        if project_item:
            print(f"Draft issue created successfully. Item ID: {project_item['id']}")
            return project_item["id"]
        else:
            print("Error: Unable to retrieve project item ID.")
    else:
        print(f"Error: {response.status_code}, {response.text}")
    return None

def update_status_field(project_id, item_id, field_id, option_id):
    """
    Updates the status field of the created draft issue.
    :param project_id: The ProjectV2 ID.
    :param item_id: The ID of the draft issue.
    :param field_id: The ID of the 'Status' field.
    :param option_id: The ID of the 'Needs Review' dropdown option.
    """
    query = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
        updateProjectV2ItemFieldValue(input: {projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: {singleSelectOptionId: $optionId}}) {
            projectV2Item { id }
        }
    }
    """
    variables = {
        "projectId": project_id,
        "itemId": item_id,
        "fieldId": field_id,
        "optionId": option_id
    }
    response = requests.post(
        GH_GRAPHQL_URL,
        json={"query": query, "variables": variables},
        headers=HEADERS,
        verify=False  # Disable SSL verification temporarily for debugging
    )
    if response.status_code == 200:
        print(f"Status updated successfully for Item ID: {item_id}")
    else:
        print(f"Error: {response.status_code}, {response.text}")

# Main script execution
if __name__ == "__main__":
    project_id = "MDk6UHJvamVjdFYyMTg="  # Project ID for Universal Amp
    title = "Draft Issue via Python Script"
    body = """### Issue Description
    
Please describe the problem in detail.

### Steps to Reproduce
1. Step one
2. Step two

### Expected Result
What you expected to happen.

### Actual Result
What actually happened.

### Additional Information
Any screenshots, logs, or additional context."""
    field_id = "MDI2OlByb2plY3RWMlNpbmdsZVNlbGVjdEZpZWxkMjIz"  # Field ID for Status
    option_id = "1701d403"  # Option ID for "Needs Review"

    print("Creating a draft issue...")
    draft_item_id = create_draft_issue(project_id, title, body)

    if draft_item_id:
        print("Updating status to 'Needs Review'...")
        update_status_field(project_id, draft_item_id, field_id, option_id)
        print("Draft issue created and status updated to 'Needs Review'.")
    else:
        print("Failed to create draft issue.")
