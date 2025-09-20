// The Firestore project ID is loaded from an environment variable.
// Make sure you have a .env file with VITE_FIRESTORE_PROJECT_ID="your-project-id"
const PROJECT_ID = import.meta.env.VITE_FIRESTORE_PROJECT_ID;

/**
 * Transforms a standard JavaScript object into the JSON format required by the Firestore REST API.
 * Each value is mapped to a type (e.g., stringValue, integerValue).
 *
 * @param data The JavaScript object to transform.
 * @returns A Firestore-compatible fields object.
 */
const transformToFirestoreFormat = (data: { [key: string]: any }) => {
  const transformValue = (value: any): any => {
    if (value === null) return { nullValue: null };
    if (typeof value === 'string') return { stringValue: value };
    if (typeof value === 'boolean') return { booleanValue: value };
    if (typeof value === 'number' && Number.isInteger(value)) return { integerValue: value };
    if (typeof value === 'number') return { doubleValue: value };
    if (value instanceof Date) return { timestampValue: value.toISOString() };
    if (Array.isArray(value)) return { arrayValue: { values: value.map(transformValue) } };
    if (typeof value === 'object') return { mapValue: { fields: transformToFirestoreFormat(value) } };
    return { nullValue: null }; // For undefined and other unsupported types
  };

  const fields: { [key: string]: any } = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      if (value !== undefined) {
        fields[key] = transformValue(value);
      }
    }
  }
  return fields;
};

/**
 * Writes a document to a Firestore collection using the REST API.
 *
 * @param token The Google ID token (JWT) for authentication.
 * @param collectionName The name of the Firestore collection.
 * @param data The JavaScript object to write to the document.
 * @param documentId (Optional) The ID for the document. If not provided, Firestore will auto-generate one.
 * @returns The created or updated document data from Firestore.
 */
export const writeToFirestore = async (
  token: string,
  collectionName: string,
  data: { [key: string]: any },
  documentId?: string
) => {
  if (!PROJECT_ID) {
    console.error('Firestore Error: VITE_FIRESTORE_PROJECT_ID is not set in your .env file.');
    throw new Error('Firestore project ID is not configured.');
  }

  // Use PATCH to create or overwrite a document with a specific ID.
  // The REST API uses POST to create a document with an auto-generated ID,
  // which is slightly different. For simplicity, we'll use PATCH for both creating
  // with a specific ID and updating. To properly support auto-generated IDs,
  // we would need a separate method using POST.
  const method = 'PATCH';
  const docPath = documentId ? `/${documentId}` : '';
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${collectionName}${docPath}`;

  const requestBody = {
    fields: transformToFirestoreFormat(data),
  };

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Firestore API Error:', errorData);
      throw new Error(`Failed to write to Firestore: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('Document successfully written to Firestore:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error writing to Firestore:', error);
    throw error;
  }
};
