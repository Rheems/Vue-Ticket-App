<template>
  <button
    :class="['ui-button', ui-button--${variant}, ui-button--${size}]"
    :type="type"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
// Define props
const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "outline"].includes(value),
  },
  size: {
    type: String,
    default: "medium",
    validator: (value) => ["small", "medium", "large"].includes(value),
  },
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});

// Define emits
const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.disabled) {
    emit("click", event);
  }
};
</script>

<style scoped>
.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  outline: none;
}

.ui-button:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

/* Variants */
.ui-button--primary {
  background-color: #667eea;
  color: white;
}

.ui-button--primary:hover {
  background-color: #5a6fd8;
}

.ui-button--secondary {
  background-color: #e2e8f0;
  color: #4a5568;
}

.ui-button--secondary:hover {
  background-color: #cbd5e0;
}

.ui-button--outline {
  background-color: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.ui-button--outline:hover {
  background-color: #667eea;
  color: white;
}

/* Sizes */
.ui-button--small {
  padding: 8px 16px;
  font-size: 14px;
}

.ui-button--medium {
  padding: 12px 24px;
  font-size: 16px;
}

.ui-button--large {
  padding: 16px 32px;
  font-size: 18px;
}

/* Disabled state */
.ui-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
S
