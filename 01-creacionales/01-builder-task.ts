import { COLORS } from '../helpers/colors.ts';

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

    console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
    private table: string;
    private fields: string[] = [];
    private conditions: string[] = [];
    private orderFields: string[] = [];
    private limitCount?: number;

    constructor(table: string) {
        this.table = table;
    }

    select(...fields: string[]): QueryBuilder {
        if (fields.length === 0) {
            this.fields.push('*');
        } else {
            this.fields.push(...fields);
        }
        return this;

    }

    where(condition: string): QueryBuilder {
        if (condition) {
            this.conditions.push(condition);
        }
        return this;

    }

    orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
        this.orderFields.push(`${field} ${direction}`);
        return this;

    }

    limit(count: number): QueryBuilder {
        this.limitCount = count;
        return this;
    }

    execute(): string {
        // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
        let query = `Select ${this.fields.join(', ')}  from ${this.table}`;
        if (this.conditions.length > 0) {
            query += ` where ${this.conditions.join(' and ')}`;
        }
        if (this.orderFields.length > 0) {
            query += ` order by ${this.orderFields.join(', ')}`;
        }
        if (this.limitCount) {
            query += ` limit ${this.limitCount}`;
        }
        return query;
    }
}

class QueryBuilder2 {
    private table: string;
    private fields: string[] = [];
    private conditions: string[] = [];
    private orderFields: string[] = [];
    private limitCount?: number;

    constructor(table: string) {
        this.table = table;
    }

    select(...fields: string[]): QueryBuilder2 {
        this.fields = fields;
        return this;
    }

    where(condition: string): QueryBuilder2 {
        this.conditions.push(condition);
        return this;
    }

    orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder2 {
        this.orderFields.push(`ORDER BY ${field} ${direction}`);
        return this;
    }

    limit(count: number): QueryBuilder2 {
        this.limitCount = count;
        return this;
    }

    execute(): string {
        const fields = this.fields.length === 0 ? '*' : this.fields.join(', ');

        const whereClause = this.conditions.length > 0 ? `WHERE ${this.conditions.join(' AND ')}` : '';

        const orderByClause = this.orderFields.length > 0 ? this.orderFields.join(', ') : '';

        const limitClause = this.limitCount ? `LIMIT ${this.limitCount}` : '';

        return `SELECT ${fields} FROM ${this.table} ${whereClause} ${orderByClause} ${limitClause}`;
    }


}

function main() {
    const usersQuery = new QueryBuilder('users')
        .select('id', 'name', 'email')
        .where('age > 18')
        .where("country = 'Cri'") // Esto debe de hacer una condición AND
        .orderBy('name', 'ASC')
        .limit(10)
        .execute();

    console.log('%cConsulta:\n', COLORS.red);
    console.log(usersQuery);
}


function main2() {
    const usersQuery = new QueryBuilder2('users')
        .select('id', 'name', 'email')
        .where('age > 18')
        .where("country = 'Cri'") // Esto debe de hacer una condición AND
        .orderBy('name', 'ASC')
        .orderBy('age', 'DESC')
        .limit(10)
        .execute();

    console.log('%cConsulta:\n', COLORS.red);
    console.log(usersQuery);
}

main();
main2();
