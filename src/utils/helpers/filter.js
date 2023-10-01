function findNameAtOneLevel(childrenArray, nameToFind) {
  // console.log(childrenArray, nameToFind)
for (const child of childrenArray) {
  //   console.log("Hello ",child.name,nameToFind)
  if (child.name === nameToFind) {
      // console.log("Hello ",child.name,nameToFind)
    return { childExists: true, child: child };
  }
}
return { childExists: false, child: null };
}

export const getCategories = (categories) => {
// const cate = [
//   "Amplifiers/Active Filters",
//   "Amplifiers/Amplifier IC Development Boards and Kits",
//   "Amplifiers/Amplifiers and Comparators/Instrumentation Amplifiers",
//   "Amplifiers/Amplifiers and Comparators/Linear Comparators",
//   "Amplifiers/Amplifiers and Comparators/Operational Amplifiers - Op Amps",
//   "Amplifiers/Amplifiers and Comparators/RF Amplifiers",
//   "Amplifiers/Amplifiers and Comparators/Special Purpose Amplifiers",
//   "Amplifiers/Analog Dividers and Multipliers",
//   "Amplifiers/CATV Amplifiers",
//   "Amplifiers/GPS/GPS Amplifiers",
//   "Amplifiers/Multimedia Amplifiers/Audio Amplifiers",
//   "Amplifiers/Multimedia Amplifiers/Video Amplifiers",
//   "Amplifiers/Other/Amplifiers Misc",
//   "Multimedia Amplifiers/Audio Amplifiers"
// ];

// Initialize an empty object to store the hierarchical structure
const categoryHierarchy = {
  name: 'Parent',
  leaves: [],
  children: []
}

// Iterate through each category
categories?.forEach(category => {
  // Split the category into segments using the "/" delimiter
  const segments = category.split("/");

  // Initialize the current level with the root of the hierarchy
  let currentLevel = categoryHierarchy;

  // Iterate through the segments to build the hierarchy
  segments.forEach(segment => {
    // If the segment doesn't exist in the current level, create it
  //   console.log(currentLevel.leaves);
    currentLevel.leaves.push(category);

    const { childExists, child } = findNameAtOneLevel(currentLevel.children, segment);
  //   console.log(childExists,child)

    if (!childExists) {
      const temp = {
        name: segment,
        leaves: [],
        children: []
      }
      currentLevel.children.push(temp);
      currentLevel = temp; // Move to the next level
    } else {
      currentLevel = child; // Move to the next level
    }
  });
  currentLevel.leaves.push(category);
});

console.log(categoryHierarchy,"categoryHierarchy")

return categoryHierarchy;

// The resulting hierarchy is stored in the categoryHierarchy object
// console.log(JSON.stringify(categoryHierarchy, null, 2));
}

// console.log("Get categories", getCategories())