const express = require("express");
const Plant = require("../schema/PlantSchema");

const router = express.Router();

router.post("/plant-filter", async (req, res) => {
  try {
    const { scientificName , commonName, references,  medicinal, family, genus ,plantType , properties} = req.body;
    console.log(scientificName);
    console.log(commonName);
    console.log(references);
    console.log(medicinal);
    console.log(family);
    console.log(genus);
    console.log(plantType);
    console.log(properties);

    let query = {};
    let projection = {}; // projection lets you choose which fields you need to include in the doc ,
    // for each field if 1 is given then included else not included 


    // based on comparison with the documents and the user's inputs we find the bunch of docs that are close to the user's search 
    // the data from the user undergoes the following : 
    /*
    1. Tokenization : the user's data is being converted to into a space separated string and each word is now a token and will be checked
    for in the text field indexes in the PlantSchema.js 

    2. Common Words are removed and the words are reduced to its stem : is , at , and are removed . Let us say if the word used by user 
    is running it will be reduced to run 

    3. Frequency of occurance : It checks how many times a token obtained from user appears in a particular doc , higher the frequency of the 
    token more score the doc gets , now if the token is a frequently appearing one like run , see etc then these tokens have lesser weights and will not 
    affect doc score much , eif token is a name or scientific stuff then it affects the doc score more 

    4. Calculating inverse document frequency : 
    IDF = log( Total Docs / Docs Containing Word )
    which means more rare words = higher scoring 

    5. The final score is computed using:
    textScore = TF-IDF Score = Term Frequency × Inverse Document Frequency
    Higher word frequency (TF) → Higher score.
    Rarer words (IDF) → Higher score.
    Words appearing in title/heading get extra weight.

    6. Sorting based on the projection.score parameter, if docs have same score , sorting is done for both using _id 

    */


    if (references || family || genus || scientificName || commonName) {
      let searchTerms = [];// vacant array which will contain all teh required data for querying
      if(scientificName) searchTerms.push(scientificName.trim());
      if(commonName) searchTerms.push(commonName.trim())
      if (references) searchTerms.push(references.trim());
      if (family) searchTerms.push(family.trim());
      if (genus) searchTerms.push(genus.trim());
      if(medicinal) searchTerms.push(medicinal.trim());
      query.$text = { $search: searchTerms.join(" ") };// making the array of data in a single space separated string for querying
      projection.score = { $meta: "textScore" };//$meta : used to add values to metadata of the doc 
      // $meta:"textScore" = only textScore will be added to the metadata
    }

    
    if (plantType) query.plantType = plantType;
    if(properties) query.properties = properties;

    const plants = await Plant.find(query, projection)
      .sort(references || family || genus ? { score: { $meta: "textScore" } } : {});

    if (plants.length === 0) {
      return res.status(404).json({ message: "No matching plants found." });
    }

    res.json(plants);
  } catch (error) {
    console.error("Filter Error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;
