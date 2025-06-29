/// <reference path="../pb_data/types.d.ts" />

onBootstrap((e) => {
  e.next();
  // Create the collection if it doesn't exist
  try {
    const collection = $app.findCollectionByNameOrId("candidate_info");
    $app.delete(collection);
  } catch (err) {
    console.info("Collection 'candidate_info' not found, creating...");
  }
  const collection = new Collection({
    name: "candidate_info",
    type: "base",
    listRule: "",
    viewRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: null,
    fields: [
      {
        name: "data",
        type: "json",
        required: false,
        options: {},
      },
      {
        name: "created_at",
        type: "autodate",
        required: false,
        onCreate: true,
      },
      {
        name: "updated_at",
        type: "autodate",
        required: false,
        onUpdate: true,
        onCreate: true,
      },
    ],
  });

  $app.save(collection);
});
