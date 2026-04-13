import pandas as pd


def main():
    datos = {
        "Nombre": ["Ana", "Carlos", "Luisa", "Juan", "Sofía"],
        "Edad": [20, 22, 21, 23, 20],
        "Nota 1": [4.5, 3.2, 4.8, 2.9, 4.0],
        "Nota 2": [3.8, 3.5, 4.6, 3.0, 3.9],
        "Nota 3": [4.2, 3.8, 4.9, 3.2, 4.1],
        "Ciudad": ["Bogotá", "Medellín", "Cali", "Barranquilla", "Bogotá"],
    }

    df = pd.DataFrame(datos)

    df["Promedio"] = df[["Nota 1", "Nota 2", "Nota 3"]].mean(axis=1).round(2)

    df["Estado"] = df["Promedio"].apply(
        lambda promedio: "Aprobado" if promedio >= 3.5 else "Reprobado"
    )

    print("=" * 60)
    print("DataFrame Completo:")
    print("=" * 60)
    print(df.to_string(index=False))

    print("\n" + "=" * 60)
    print("Estudiantes de Bogotá:")
    print("=" * 60)
    bogota_df = df[df["Ciudad"] == "Bogotá"]
    print(bogota_df.to_string(index=False))

    print("\n" + "=" * 60)
    print("Mejor Promedio:")
    print("=" * 60)
    mejor_estudiante = df.loc[df["Promedio"].idxmax()]
    print(f"Nombre: {mejor_estudiante['Nombre']}")
    print(f"Ciudad: {mejor_estudiante['Ciudad']}")
    print(f"Promedio: {mejor_estudiante['Promedio']}")

    df.to_excel("estudiantes.xlsx", index=False)
    print("\nArchivo 'estudiantes.xlsx' guardado exitosamente.")


if __name__ == "__main__":
    main()
