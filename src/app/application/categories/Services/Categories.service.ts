import { Injectable } from "@angular/core";
import { ApiConnectionService } from "src/app/core/services/api-connection.service";
import { CategoryDTO, CategoryRequest, CategoryType } from "../DTO/CategoryDTO";

/**
 * Acceso HTTP a `api/Categories` (SPEC-09).
 *
 * El bearer se adjunta automáticamente en `ApiConnectionService`, por lo que
 * los métodos no reciben token. Desactivar reutiliza `PUT { isActive:false }`
 * (el backend no expone `/deactivate`).
 */
@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private apiConnectionService: ApiConnectionService) {}

  async getCategories(
    type?: CategoryType,
    search?: string
  ): Promise<CategoryDTO[]> {
    const parameters: Record<string, string> = {};
    if (type) {
      parameters["type"] = String(type);
    }
    if (search) {
      parameters["search"] = search;
    }

    return await this.apiConnectionService.sendRequestAsync<CategoryDTO[]>(
      "categories",
      "GET",
      null,
      {},
      parameters
    );
  }

  async getById(id: number): Promise<CategoryDTO> {
    return await this.apiConnectionService.sendRequestAsync<CategoryDTO>(
      `categories/${id}`,
      "GET"
    );
  }

  async create(datos: CategoryRequest): Promise<CategoryDTO> {
    return await this.apiConnectionService.sendRequestAsync<CategoryDTO>(
      "categories",
      "POST",
      datos
    );
  }

  async update(id: number, datos: CategoryRequest): Promise<CategoryDTO> {
    return await this.apiConnectionService.sendRequestAsync<CategoryDTO>(
      `categories/${id}`,
      "PUT",
      datos
    );
  }

  async delete(id: number): Promise<boolean> {
    return await this.apiConnectionService.sendRequestAsync<boolean>(
      `categories/${id}`,
      "DELETE"
    );
  }

  async deactivate(category: CategoryDTO): Promise<CategoryDTO> {
    return await this.update(category.id, {
      name: category.name,
      type: category.type,
      color: category.color,
      icon: category.icon,
      isActive: false,
    });
  }
}
