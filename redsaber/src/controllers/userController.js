import userService from "../services/userService.js";

async function register(req, res) {

    const { username, password } = req.body;

    try {
        const id_newUser = await userService.registerUser(username, password);

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            id_newUser
        });

    } catch (error) {

        console.error("Error al registrar usuario:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                error: "El usuario ya existe"
            });
        }

        return res.status(500).json({
            error: "Error al registrar usuario"
        });
    }
}

async function getAllUsers(req, res) {
    try {
        const allUsers = await userService.getAllUsers();

        return res.status(200).json({
            message: "Todos los usuarios",
            allUsers
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al encontrar todos los usuarios"
        });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;

        const ObtainedUser = await userService.getUserById(id);

        if (!ObtainedUser) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        return res.status(200).json(ObtainedUser);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Error al buscar usuario"
        });
    }
}

export default {
    register,
    getAllUsers,
    getUserById
};