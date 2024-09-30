const { default: mongoose } = require("mongoose");

const { ObjectId } = mongoose.Types;

// Utility function to recursively convert ObjectId to strings
export function deepConvertObjectIds(obj) {
  // Check if the value is an ObjectId
  if (obj instanceof ObjectId) {
    return obj.toString(); // Convert ObjectId to string
  }

  // If the value is an array, recursively convert its elements
  if (Array.isArray(obj)) {
    return obj.map(deepConvertObjectIds); // Recursively apply to array elements
  }

  // If the value is an object, recursively convert its keys
  if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = deepConvertObjectIds(obj[key]); // Recursively apply to object values
      return acc;
    }, {});
  }

  // Return the value as is if it's neither ObjectId, array, nor object
  return obj;
}
