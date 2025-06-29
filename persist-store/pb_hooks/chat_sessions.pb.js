// pb_hooks/chat_sessions.pb.js

onBootstrap((e) => {
  e.next();
  // Create the collection if it doesn't exist
  try {
    const collection = $app.findCollectionByNameOrId("chat_sessions");
    $app.delete(collection);
  } catch (err) {
    console.info("Collection 'chat_sessions' not found, creating...");
  }
  const collection = new Collection({
    name: "chat_sessions",
    type: "base",
    listRule: "",
    viewRule: "",
    createRule: "",
    updateRule: "",
    deleteRule: "",
    fields: [
      {
        name: "session_data",
        type: "json",
        required: false,
        options: {},
      },
      {
        name: "metadata",
        type: "json",
        required: false,
        options: {},
      },
      {
        name: "created_by",
        type: "text",
        required: false,
        options: {
          max: 255,
        },
      },
      {
        name: "title",
        type: "text",
        required: false,
        options: {
          max: 255,
        },
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
