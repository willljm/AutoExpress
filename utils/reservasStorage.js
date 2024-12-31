export const reservasStorage = {
  guardarReserva: (reserva) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const nuevaReserva = {
      ...reserva,
      id: Date.now().toString(),
      fechaCreacion: new Date().toISOString()
    };
    reservas.push(nuevaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    return nuevaReserva;
  },

  obtenerReservas: (userId = null) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    if (userId) {
      return reservas.filter(r => r.userId === userId);
    }
    return reservas;
  },

  eliminarReserva: (id) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const nuevasReservas = reservas.filter(r => r.id !== id);
    localStorage.setItem('reservas', JSON.stringify(nuevasReservas));
  },

  actualizarReserva: (id, datos) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const index = reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      reservas[index] = { ...reservas[index], ...datos };
      localStorage.setItem('reservas', JSON.stringify(reservas));
      return reservas[index];
    }
    return null;
  },

  obtenerReservasActivas: (userId) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const ahora = new Date();
    return reservas
      .filter(r => r.userId === userId && new Date(r.fechaFin) > ahora)
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
  },

  obtenerHistorialReservas: (userId) => {
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    const ahora = new Date();
    return reservas
      .filter(r => r.userId === userId && new Date(r.fechaFin) <= ahora)
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
  },
};
