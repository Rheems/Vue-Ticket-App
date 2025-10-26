<template>
  <div class="ticket-management">
    <div class="container">
      <div class="page-header">
        <div class="header-content">
          <h1>Ticket Management</h1>
          <p>Manage all your support tickets in one place</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary">
          + Create Ticket
        </button>
      </div>

      <!-- Filters and Search -->
      <div class="filters-section">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search tickets..."
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>

        <div class="filter-controls">
          <select v-model="statusFilter" class="filter-select">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <select v-model="priorityFilter" class="filter-select">
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select v-model="sortBy" class="filter-select">
            <option value="updatedAt">Last Updated</option>
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div class="tickets-section">
        <div v-if="filteredTickets.length === 0" class="empty-state">
          <div class="empty-icon">📋</div>
          <h3>No tickets found</h3>
          <p v-if="searchQuery || statusFilter || priorityFilter">
            Try adjusting your search or filters
          </p>
          <p v-else>
            Get started by creating your first ticket
          </p>
          <button @click="showCreateModal = true" class="btn-primary">
            Create Ticket
          </button>
        </div>

        <div v-else class="tickets-grid">
          <TicketCard
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            :ticket="ticket"
            @edit="handleEditTicket(ticket)"
            @delete="handleDeleteTicket(ticket)"
          />
        </div>
      </div>
    </div>

    <!-- Create/Edit Ticket Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ isEditing ? 'Edit Ticket' : 'Create New Ticket' }}</h3>
          <button @click="closeModal" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <TicketForm
            :ticket="currentTicket"
            :isSubmitting="isSubmitting"
            @submit="isEditing ? handleUpdateTicket : handleCreateTicket"
            @cancel="closeModal"
          />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="showDeleteModal = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Confirm Delete</h3>
          <button @click="showDeleteModal = false" class="modal-close">×</button>
        </div>
        <div class="modal-body">
          <div class="delete-confirmation">
            <p>Are you sure you want to delete the ticket <strong>"{{ ticketToDelete?.title }}"</strong>?</p>
            <p class="warning-text">This action cannot be undone.</p>
            <div class="delete-actions">
              <button @click="showDeleteModal = false" class="btn-secondary">
                Cancel
              </button>
              <button @click="confirmDelete" class="btn-danger">
                Delete Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useTicketsStore } from '../stores/tickets'
import { useToastStore } from '../stores/toast'
import TicketCard from '../components/Ticket/TicketCard.vue'
import TicketForm from '../components/Ticket/TicketForm.vue'

export default {
  name: 'TicketManagement',
  components: {
    TicketCard,
    TicketForm
  },
  setup() {
    const ticketStore = useTicketsStore()
    const toastStore = useToastStore()

    // State
    const showCreateModal = ref(false)
    const showEditModal = ref(false)
    const showDeleteModal = ref(false)
    const isSubmitting = ref(false)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const priorityFilter = ref('')
    const sortBy = ref('updatedAt')
    const ticketToDelete = ref(null)
    const currentTicket = ref(null)

    // Computed
    const isEditing = computed(() => showEditModal.value)

    const filteredTickets = computed(() => {
      let filtered = [...ticketStore.tickets]

      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(ticket =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query)
        )
      }

      // Apply status filter
      if (statusFilter.value) {
        filtered = filtered.filter(ticket => ticket.status === statusFilter.value)
      }

      // Apply priority filter
      if (priorityFilter.value) {
        filtered = filtered.filter(ticket => ticket.priority === priorityFilter.value)
      }

      // Apply sorting
      filtered.sort((a, b) => {
        if (sortBy.value === 'title') {
          return a.title.localeCompare(b.title)
        } else if (sortBy.value === 'priority') {
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        } else {
          return new Date(b[sortBy.value]) - new Date(a[sortBy.value])
        }
      })

      return filtered
    })

    // Methods
    const handleCreateTicket = async (ticketData) => {
      isSubmitting.value = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        ticketStore.createTicket(ticketData)
        toastStore.showToast('Ticket created successfully!', 'success')
        closeModal()
      } catch (error) {
        toastStore.showToast('Failed to create ticket', 'error')
      } finally {
        isSubmitting.value = false
      }
    }

    const handleEditTicket = (ticket) => {
      currentTicket.value = ticket
      showEditModal.value = true
    }

    const handleUpdateTicket = async (ticketData) => {
      isSubmitting.value = true
      
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        ticketStore.updateTicket(currentTicket.value.id, ticketData)
        toastStore.showToast('Ticket updated successfully!', 'success')
        closeModal()
      } catch (error) {
        toastStore.showToast('Failed to update ticket', 'error')
      } finally {
        isSubmitting.value = false
      }
    }

    const handleDeleteTicket = (ticket) => {
      ticketToDelete.value = ticket
      showDeleteModal.value = true
    }

    const confirmDelete = () => {
      if (ticketToDelete.value) {
        ticketStore.deleteTicket(ticketToDelete.value.id)
        toastStore.showToast('Ticket deleted successfully!', 'success')
        showDeleteModal.value = false
        ticketToDelete.value = null
      }
    }

    const closeModal = () => {
      showCreateModal.value = false
      showEditModal.value = false
      currentTicket.value = null
    }

    // Check if there's a current ticket to edit (from dashboard)
    onMounted(() => {
      ticketStore.initializeTickets()
      
      if (ticketStore.currentTicket) {
        currentTicket.value = ticketStore.currentTicket
        showEditModal.value = true
        ticketStore.clearCurrentTicket()
      }
    })

    return {
      // State
      showCreateModal,
      showEditModal,
      showDeleteModal,
      isSubmitting,
      searchQuery,
      statusFilter,
      priorityFilter,
      sortBy,
      ticketToDelete,
      currentTicket,
      
      // Computed
      isEditing,
      filteredTickets,
      ticketStore,
      
      // Methods
      handleCreateTicket,
      handleEditTicket,
      handleUpdateTicket,
      handleDeleteTicket,
      confirmDelete,
      closeModal
    }
  }
}
</script>

<style scoped>
.ticket-management {
  padding: 2rem 0;
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;
}

.header-content h1 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.header-content p {
  color: #666;
  margin: 0;
}

.btn-primary {
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #0056b3;
  transform: translateY(-1px);
}

.filters-section {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: #f8f9fa;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  background: white;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.filter-select:focus {
  outline: none;
  border-color: #007bff;
  background: white;
}

.tickets-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  color: #333;
  margin-bottom: 1rem;
}

.empty-state p {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal {
  background: white;
  border-radius: 10px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e1e5e9;
}

.modal-header h3 {
  margin: 0;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.modal-close:hover {
  background: #f8f9fa;
  color: #333;
}

.modal-body {
  padding: 0;
}

.delete-confirmation {
  padding: 2rem;
}

.delete-confirmation p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.warning-text {
  color: #dc3545;
  font-weight: 500;
}

.delete-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #c82333;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .filter-controls {
    justify-content: stretch;
  }
  
  .filter-select {
    flex: 1;
    min-width: auto;
  }
  
  .tickets-grid {
    grid-template-columns: 1fr;
  }
  
  .tickets-section {
    padding: 1.5rem;
  }
  
  .modal {
    margin: 1rem;
  }
  
  .modal-header {
    padding: 1rem 1.5rem;
  }
  
  .delete-actions {
    flex-direction: column;
  }
}
</style>
s