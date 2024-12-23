import { Professional as ProfessionalInterface } from "./professionals.entity.js";
import { Professional as ProfessionalModel } from "../professional/professional.model.js";
import { User } from "../user/user.model.js";
import bcrypt from "bcrypt";
import { generatePassword } from "../utils/passwordGenerator.js";

export class ProfessionalRepository {
    /**
     * Encuentra todos los profesionales.
     */
    public async findAll(): Promise<ProfessionalInterface[]> {
        try {
            const professionals = await ProfessionalModel.findAll();
            return professionals.map(professional => professional.toJSON() as ProfessionalInterface);
        } catch (error) {
            console.error("Error fetching professionals:", error);
            throw new Error("Unable to fetch professionals");
        }
    }

    /**
     * Encuentra un profesional por ID.
     */
    public async findOne(item: {id: string}): Promise<ProfessionalInterface | null> {
        const id= Number.parseInt(item.id);
        if (isNaN(id)) return null;
        const professional = await ProfessionalModel.findByPk(id);
        return professional ? (professional.toJSON() as ProfessionalInterface) : null
        
    }

    /**
     * Agrega un profesional y crea un usuario asociado.
     */
    public async add(
        professionalInput: Omit<ProfessionalInterface, "id">
    ): Promise<{
        professional: ProfessionalInterface;
        user: { username: string; tempPassword: string };
    }> {
        try {
            // Crear el profesional
            const newProfessional = await ProfessionalModel.create(professionalInput);

            // Generar una contraseña temporal
            const tempPassword = generatePassword();
            const hashedPassword = await bcrypt.hash(tempPassword, 10);

            // Crear el usuario asociado
            const user = await User.create({
                username: professionalInput.email,
                password: hashedPassword,
                role: "professional",
                professionalId: newProfessional.id,
            });

            return {
                professional: newProfessional.toJSON() as ProfessionalInterface,
                user: {
                    username: user.username,
                    tempPassword,
                },
            };
        } catch (error) {
            console.error("Error adding professional and user:", error);
            throw new Error("Unable to add professional and user");
        }
    }

    /**
     * Actualiza un profesional.
     */
    public async update(
        id: string,
        professionalInput: Partial<ProfessionalInterface>
    ): Promise<ProfessionalInterface | undefined> {
        try {
            const professionalToUpdate = await ProfessionalModel.findByPk(Number(id));
            if (!professionalToUpdate) return undefined;

            await professionalToUpdate.update(professionalInput);
            return professionalToUpdate.toJSON() as ProfessionalInterface;
        } catch (error) {
            console.error("Error updating professional:", error);
            throw new Error("Unable to update professional");
        }
    }

    /**
     * Elimina un profesional.
     */
    public async delete(item:{id: string}): Promise<ProfessionalInterface | null> {
        const professionalToDelete = await this. findOne(item);
        if (!professionalToDelete) return null;
        await ProfessionalModel.destroy({where:{id: professionalToDelete.id}});
            return professionalToDelete
        }
    }


