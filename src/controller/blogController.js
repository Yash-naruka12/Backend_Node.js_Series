const randomString = require("randomstring");
const Blog = require("../model/blogModel");

function fileUpload(fileData) {
  const name = randomString.generate({
    length: 12,
    charset: "alphabetic",
  });

  let fileExtension = fileData.name.split(".");
  fileExtension = fileExtension[fileExtension.length - 1];

  let mimeType = fileData.mimetype.split("/")[0];
  mimeType =
    mimeType === "image" || mimeType === "video" ? mimeType : "document";

  let fileName = `${name}.${fileExtension}`;

  let filePath = "/public/images/" + fileName;

  fileData.mv("./src" + filePath);

  return {
    name: fileName,
    ext: fileExtension,
    mimeType: mimeType,
    path: filePath,
  };
}

const createBlog = async (req, res) => {
  try {
    const { userId } = req.user;
    const { file } = req.files;

    const { title, description, category } = req.body;

    if (!title || !description || !category || !file || !userId) {
      return res
        .status(400)
        .send({ message: "Please provide all required fields." });
    }

    const fileData = fileUpload(file);

    const blogData = await Blog.create({
      title,
      description,
      category,
      image: fileData,
      userId: userId,
    });
    return res
      .status(201)
      .send({ message: "Blog created successfully", blogData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
module.exports = { createBlog };
