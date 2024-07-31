import os
from google.cloud import storage

LOCAL_DEPLOY_FOLDER = "dist"
GCP_BUCKET_NAME = "airtek-tech-demo-trasportly"

# copy deploy path contents to GCP bucket

def deploy_to_gcp():
    print("Deploying to GCP bucket...")
    # Create a storage client.
    storage_client = storage.Client()

    # Get the bucket that the file will be uploaded to.
    bucket = storage_client.bucket(GCP_BUCKET_NAME)

    # Get the local files in the deploy folder.

    local_files = os.listdir(LOCAL_DEPLOY_FOLDER)

    # Upload the local files to the bucket.

    for local_file in local_files:
        blob = bucket.blob(local_file)
        blob.upload_from_filename(f"{LOCAL_DEPLOY_FOLDER}/{local_file}")

    print("Deployment complete.")
    

if __name__ == "__main__":
    deploy_to_gcp()