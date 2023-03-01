// import Todo from "../models/todoModel.js";
// import TodoList from "../models/todoListModel.js";

import Post from "../models/postModel.js";

// export const getAllTodos = async (req, res) => {
//     const todos = await Todo.find({});
//     res.json(todos);
// };

export const createPost = async (req, res) => {
    try {
        const data = req.body;
        const newPost = new Post(data);
        await newPost.save();
        res.json({ message: "Create Success!" });
    } catch (e) {
        res.json({ error: "An error occurred!" });
    }
};

// export const deleteTodo = async (req, res) => {
//     const id = req.params.id;
//     const listId = req.query.listId;
//     await TodoList.findOneAndUpdate({ _id: listId }, { $pull: { data: id } });

//     const deleteItem = await Todo.findById(id);
//     await deleteItem.remove().then(() => res.send(JSON.stringify(deleteItem)));
// };

// export const updateTodo = async (req, res) => {
//     const id = req.params.id;
//     const updateItem = new Todo(req.body);
//     await Todo.findByIdAndUpdate(id, updateItem).then(() => res.send(JSON.stringify(updateItem)));
// };
