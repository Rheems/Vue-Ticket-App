// src/stores/tickets.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTicketsStore = defineStore("tickets", () => {
  const tickets = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Initialize tickets from localStorage
  const initializeTickets = () => {
    const savedTickets = localStorage.getItem("ticketapp_tickets");
    if (savedTickets) {
      tickets.value = JSON.parse(savedTickets);
    }
  };

  // Save tickets to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("ticketapp_tickets", JSON.stringify(tickets.value));
  };

  // CRUD Operations
  const createTicket = (ticketData) => {
    const newTicket = {
      id: Date.now().toString(),
      title: ticketData.title,
      description: ticketData.description || "",
      status: ticketData.status || "open",
      priority: ticketData.priority || "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tickets.value.push(newTicket);
    saveToLocalStorage();
    return newTicket;
  };

  const updateTicket = (id, ticketData) => {
    const index = tickets.value.findIndex((ticket) => ticket.id === id);
    if (index !== -1) {
      tickets.value[index] = {
        ...tickets.value[index],
        ...ticketData,
        updatedAt: new Date().toISOString(),
      };
      saveToLocalStorage();
      return tickets.value[index];
    }
    return null;
  };

  const deleteTicket = (id) => {
    const index = tickets.value.findIndex((ticket) => ticket.id === id);
    if (index !== -1) {
      tickets.value.splice(index, 1);
      saveToLocalStorage();
      return true;
    }
    return false;
  };

  const getTicketById = (id) => {
    return tickets.value.find((ticket) => ticket.id === id);
  };

  // Computed properties for statistics
  const totalTickets = computed(() => tickets.value.length);
  const openTickets = computed(
    () => tickets.value.filter((t) => t.status === "open").length
  );
  const inProgressTickets = computed(
    () => tickets.value.filter((t) => t.status === "in_progress").length
  );
  const closedTickets = computed(
    () => tickets.value.filter((t) => t.status === "closed").length
  );

  return {
    tickets,
    loading,
    error,
    totalTickets,
    openTickets,
    inProgressTickets,
    closedTickets,
    initializeTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById,
  };
});
