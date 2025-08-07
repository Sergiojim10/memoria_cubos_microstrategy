// Datos de cubos, ahora con usuario incluido
const cubes = [
    { name: "Testamentaria_vinculos", sizeMB: 30.595, user: "E043352" },
    { name: "Testamentaria_main", sizeMB: 225.372, user: "E043352" },
    { name: "Sac_reclamaciones", sizeMB: 84.101, user: "E043352" },
    { name: "Testamentarias_times_table", sizeMB: 0.665, user: "E043352" }
];

const totalMB = 1000;  // Total fijo para escala de barras

const barsContainer = document.getElementById("bars");
const userTotalsContainer = document.getElementById("userTotals");

// Mostrar barras por cubo con usuario
cubes.forEach((cube, index) => {
    let widthPercent = (cube.sizeMB / totalMB) * 100;
    if (widthPercent > 100) widthPercent = 100;

    const container = document.createElement("div");
    container.className = "cube-container";

    // Etiqueta con cubo y usuario
    const label = document.createElement("div");
    label.className = "cube-label";
    label.textContent = `${cube.user}: ${cube.name} — ${cube.sizeMB.toLocaleString()} MB`;
    container.appendChild(label);

    const barBg = document.createElement("div");
    barBg.className = "bar-background";

    const barFill = document.createElement("div");
    barFill.className = "bar-fill";

    // Usar clase de color basada en el cubo para estilo
    const colorClass = cube.name.toLowerCase().replace(/\s+/g, '_');
    barFill.classList.add(colorClass);

    barFill.style.width = "0%";
    barBg.appendChild(barFill);
    container.appendChild(barBg);

    barsContainer.appendChild(container);

    // Animar llenado de barra con pequeño delay para que se vea la animación
    setTimeout(() => {
        barFill.style.width = widthPercent + "%";
    }, 100 + index * 150);
});

// Calcular total ocupado por usuario
const totalByUser = cubes.reduce((acc, cube) => {
    if (!acc[cube.user]) acc[cube.user] = 0;
    acc[cube.user] += cube.sizeMB;
    return acc;
}, {});

// Convertir a array para iterar (usuario, size)
const users = Object.entries(totalByUser);

// Mostrar barras por usuario total
users.forEach(([user, sizeMB], idx) => {
    let widthPercent = (sizeMB / totalMB) * 100;
    if (widthPercent > 100) widthPercent = 100;

    const container = document.createElement("div");
    container.className = "user-container";

    const label = document.createElement("div");
    label.className = "user-label";
    const percentFormatted = widthPercent.toFixed(2);
    label.textContent = `${user} — ${sizeMB.toLocaleString()} MB (${percentFormatted}%)`;
    container.appendChild(label);

    const barBg = document.createElement("div");
    barBg.className = "bar-background";

    const barFill = document.createElement("div");
    barFill.className = "bar-fill user-bar-" + (idx % 4);

    barFill.style.width = "0%";
    barBg.appendChild(barFill);
    container.appendChild(barBg);

    userTotalsContainer.appendChild(container);

    setTimeout(() => {
        barFill.style.width = widthPercent + "%";
    }, 100 + idx * 150);
});
