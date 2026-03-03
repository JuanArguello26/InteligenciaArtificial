tupla = (1, 2, 3)
print("He creado una tupla llamada 'tupla':", tupla)

mytupla= ("Juan", "Maria", "Pedro", "Ana")
print("He creado una tupla llamada 'mytupla':", mytupla)

print(mytupla[0])
print(mytupla[1])
print(mytupla[2])
print(mytupla[3])

print(len(mytupla))

lista_comprasM=["Leche", "Pan", "Huevos", "Queso"]
print("Esta es tu lista de compras: " , lista_comprasM)

lista_comprasM.append("Carne")
print("Esta es tu lista de compras actualizada: " , lista_comprasM)

lista_comprasM.remove("Pan")
print("Esta es tu lista de compras actualizada: " , lista_comprasM)

lista_comprasM.pop()
print("Esta es tu lista de compras actualizada: " , lista_comprasM)

lista_comprasM.insert(0, "Queso")
print("Esta es tu lista de compras actualizada: " , lista_comprasM) 

lista1=["Leche", "Pan", "Huevos", "Queso"]
lista2=["Carne", "Pollo", "Pescado", "Res"]

lista1.extend(lista2)
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.sort()
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.reverse()
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.count("Leche")
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.index("Leche")
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.remove("Leche")
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.pop(0)
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.insert(0, "Queso")
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.clear()
print("Esta es tu lista de compras actualizada: " , lista1) 

lista1.copy()
print("Esta es tu lista de compras actualizada: " , lista1)     



## EJERCICIO (TALLER JUEGO)

# 1. Crea una lista vacía llamada numeros
numeros = []

# 2. Utiliza un bucle for para agregar los números del 1 al 10 a la lista usando la función append
for i in range(1, 11):
    numeros.append(i)

# 3. Luego, usa un bucle while para recorrer la lista e imprimir cada número
print("Imprimiendo cada número:")
i = 0
while i < len(numeros):
    print(numeros[i])
    i += 1

# 4. Finalmente, usa la función remove para eliminar los números pares de la lista. Imprime la lista resultante...
# Iteramos y si el número es par lo eliminamos con remove()
i = 0
while i < len(numeros):
    if numeros[i] % 2 == 0:
        numeros.remove(numeros[i])
        # Al eliminar un elemento con remove o por su índice de manera directa, 
        # los siguientes elementos se recorren un espacio a la izquierda,
        # así que no incrementamos el iterador 'i' en este caso.
    else:
        i += 1

print("\nLista resultante sin los números pares:", numeros)


## EJERCICIO 3




