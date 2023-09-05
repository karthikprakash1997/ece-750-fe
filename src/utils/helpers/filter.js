// Given list of categories

export const getCategories = () =>{
    const categories = [
        "Amplifiers/Active Filters",
        "Amplifiers/Amplifier IC Development Boards and Kits",
        "Amplifiers/Amplifiers and Comparators/Instrumentation Amplifiers",
        "Amplifiers/Amplifiers and Comparators/Linear Comparators",
        "Amplifiers/Amplifiers and Comparators/Operational Amplifiers - Op Amps",
        "Amplifiers/Amplifiers and Comparators/RF Amplifiers",
        "Amplifiers/Amplifiers and Comparators/Special Purpose Amplifiers",
        "Amplifiers/Analog Dividers and Multipliers",
        "Amplifiers/CATV Amplifiers",
        "Amplifiers/GPS/GPS Amplifiers",
        "Amplifiers/Multimedia Amplifiers/Audio Amplifiers",
        "Amplifiers/Multimedia Amplifiers/Video Amplifiers",
        "Amplifiers/Other/Amplifiers Misc"
    ];
      
      // Initialize an empty object to store the hierarchical structure
      const categoryHierarchy = {};
      
      // Iterate through each category
      categories.forEach(category => {
        // Split the category into segments using the "/" delimiter
        const segments = category.split("/");
      
        // Initialize the current level with the root of the hierarchy
        let currentLevel = categoryHierarchy;
      
        // Iterate through the segments to build the hierarchy
        segments.forEach(segment => {
          // If the segment doesn't exist in the current level, create it
          if (!currentLevel[segment]) {
            currentLevel[segment] = {};
          }
      
          // Move to the next level
          currentLevel = currentLevel[segment];
        });
      });
      
      // The resulting hierarchy is stored in the categoryHierarchy object
      console.log(JSON.stringify(categoryHierarchy, null, 2));
}

  