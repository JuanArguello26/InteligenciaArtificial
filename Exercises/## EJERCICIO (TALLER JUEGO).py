# EJERCICIO (TALLER JUEGO)

numeros = []


for i in range(1, 11):
    numeros.append(i)

print("Imprimiendo cada número:")
i = 0
while i < len(numeros):
    print(numeros[i])
    i += 1


i = 0
while i < len(numeros):
    if numeros[i] % 2 == 0:
        numeros.remove(numeros[i])
    
    else:
        i += 1

print("\nLista resultante sin los números pares:", numeros)