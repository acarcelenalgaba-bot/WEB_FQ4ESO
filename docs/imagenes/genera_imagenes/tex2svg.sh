#!/bin/bash

if [ -z "$1" ]; then
  echo "Uso: ./tex2svg.sh archivo.tex"
  exit 1
fi

FILE="$1"
BASENAME=$(basename "$FILE" .tex)

# Definimos la carpeta de salida (la carpeta padre)
OUT_DIR=".."

echo "1/3 Compilando $FILE con pdflatex..."
pdflatex -interaction=nonstopmode "$FILE" > /dev/null 2>&1

if [ ! -f "${BASENAME}.pdf" ]; then
  echo -e "\nError de sintaxis en LaTeX. Detalle del error:"
  echo "---------------------------------------------------"
  grep -A 3 "^!" "${BASENAME}.log"
  echo "---------------------------------------------------"
  rm -f "${BASENAME}.aux" "${BASENAME}.log" "${BASENAME}.names"
  exit 1
fi

echo "2/3 Separando páginas a archivos SVG en la carpeta padre..."

# Leer lista de nombres personalizados si el archivo existe
NAMES=()
if [ -f "${BASENAME}.names" ]; then
    mapfile -t NAMES < "${BASENAME}.names"
fi

# Calcular número total de páginas generadas
if command -v pdfinfo &> /dev/null; then
    PAGES=$(pdfinfo "${BASENAME}.pdf" | grep "Pages:" | awk '{print $2}')
else
    PAGES=$(pdfinfo "${BASENAME}.pdf" 2>/dev/null | awk '/Pages:/ {print $2}')
fi

# Extraer cada molécula/página asignándole su nombre correspondiente en la carpeta padre
for i in $(seq 1 $PAGES); do
    idx=$((i-1))
    
    # Si hay un nombre definido, lo guardamos en la carpeta padre (OUT_DIR)
    if [ -n "${NAMES[$idx]}" ]; then
        OUTNAME="$OUT_DIR/${NAMES[$idx]}.svg"
    else
        OUTNAME="$OUT_DIR/${BASENAME}_$i.svg"
    fi

    if command -v pdftocairo &> /dev/null; then
        pdftocairo -svg -f $i -l $i "${BASENAME}.pdf" "$OUTNAME"
    elif command -v pdf2svg &> /dev/null; then
        pdf2svg "${BASENAME}.pdf" "$OUTNAME" $i
    else
        echo "Error: Se necesita 'poppler-utils' o 'pdf2svg' instalado."
        exit 1
    fi
done

echo "3/3 Limpiando archivos temporales..."
rm -f "${BASENAME}.aux" "${BASENAME}.log" "${BASENAME}.pdf" "${BASENAME}.names"

echo "¡Listo! Se han generado $PAGES imágenes SVG en la carpeta padre ($OUT_DIR)."
