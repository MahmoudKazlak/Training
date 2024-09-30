<template>
  <!-- Add User -->
  <div
    class="pa-4 text-center"
    v-if="$slots.AddUser"
  >
    <v-dialog
      v-model="dialog"
      max-width="700px"
      max-height="100vh"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular bg-green"
          prepend-icon="mdi-plus"
          text="Add User"
          variant="tonal"
          v-bind="activatorProps"
        >
          <slot name="AddUser"></slot>
        </v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account-multiple-outline"
        title="User Profile"
      >
        <v-card-text>
          <v-row class="gap-0 mb-1">
            <!-- Name -->
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>
                Name
                <span
                  v-if="!name"
                  style="color: red"
                >*</span>
                <span
                  v-if="nameError"
                  style="color: red"
                > (Min 3 characters)</span>
              </v-label>
              <v-text-field
                v-model="name"
                label="Ex:Ahmad Mohammed"
                required
                :rules="[(v) => v?.length >= 3 || 'Min 3 characters']"
              ></v-text-field>
            </v-col>

            <!-- Username Field -->
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>
                Username
                <span
                  v-if="!username"
                  style="color: red"
                >*</span>
                <span
                  v-if="usernameError"
                  style="color: red"
                >* (Letters, numbers, dashes, and underscores only)</span>
              </v-label>
              <v-text-field
                v-model="username"
                label="Ex:Ahmad_mohamed"
                required
                :rules="[ (v) => /^[a-zA-Z0-9-_]+$/.test(v) || 'Only letters, numbers, dashes, and underscores' ]"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Financial && Email Field -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Financial# </v-label>
              <v-text-field v-model="financial"></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Email
                <span
                  v-if="!email"
                  style="color: red"
                >*</span>
              </v-label>
              <v-text-field
                v-model="email"
                label="test@gmail.com"
                type="email"
                required
                :rules="[(v) => /.+@.+\..+/.test(v) || 'Invalid email format']"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Password Field with Strength Indicator -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Password <span
                  v-if="!password"
                  style="color: red"
                >*</span></v-label>
              <v-text-field
                v-model="password"
                :type="passwordVisible ? 'text' : 'password'"
                required
                :append-inner-icon="passwordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="togglePasswordVisibility"
                @input="checkPasswordStrength"
              ></v-text-field>
              <v-progress-linear
                v-model="passwordStrength"
                :color="passwordStrengthColor"
                :value="passwordStrength"
              ></v-progress-linear>
              <span :style="{ color: passwordStrengthColor }">{{ passwordStrengthMessage }}</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Confirm Password
                <span
                  v-if="!confirmPassword"
                  style="color: red"
                >*</span>
              </v-label>
              <v-text-field
                v-model="confirmPassword"
                :type="passwordVisible ? 'text' : 'password'"
                required
                :append-inner-icon="passwordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="togglePasswordVisibility"
                @input="checkPasswordMatch"
              ></v-text-field>
              <v-progress-linear
                v-model="passwordMatchStrength"
                :color="passwordMatchColor"
                :value="passwordMatchStrength"
              ></v-progress-linear>
              <span :style="{ color: passwordMatchColor }">{{ passwordMatchMessage }}</span>
            </v-col>
          </v-row>

          <!-- User Type -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>User Type
                <span
                  v-if="!type"
                  style="color: red"
                >*</span>
              </v-label>
              <v-select
                v-model="type"
                :items="['tracking', 'testing', 'driving']"
                required
              ></v-select>
            </v-col>
          </v-row>

          <!-- Roles with Multiple Selection -->
          <v-row>
            <v-col cols="12">
              <v-label>Roles
                <span
                  v-if="Object.keys(roles).length === 0"
                  style="color: red"
                >*</span>
              </v-label>
              <v-autocomplete
                v-model="roles"
                :items="['Admin', 'User', 'Manager', 'HR']"
                label="Roles"
                auto-select-first
                multiple
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="d-flex justify-start media"
            >
              <v-btn
                class="bg-red media-item"
                text="Cancel"
                variant="tonal"
                @click="dialog = false"
              ></v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="d-flex justify-end media"
            >
              <v-btn
                class="bg-green media-item"
                text="Save"
                variant="tonal"
                @click="validateForm"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog
      v-model="errorDialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>All fields must be filled correctly.</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="errorDialog = false"
          >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <!-- Deafult Slot -->
  <div
    class="text-center"
    v-if="$slots.ViewUser"
  >
    <v-dialog
      v-model="dialog"
      max-width="700px"
      max-height="100vh"
      scrim="rgba(0, 0, 0, 0.7)"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          icon
          v-bind="activatorProps"
        >
          <slot name="ViewUser">
            <v-icon>{{ icon }}</v-icon>
          </slot>
        </v-btn>
      </template>
      <v-card subtitle="User Details">
        <v-card-text>
          <v-row class="gap-0 mb-1">
            <!-- Name -->
            <v-col
              cols="12"
              sm="6"
              class="sm-center"
            >
              <v-label prepend-icon="mdi-account-details-outline">
                <v-icon>mdi-account-multiple-outline</v-icon>
                <h3 class="fw-bold">{{ userObj.name }}</h3>
              </v-label>
            </v-col>

            <!-- Button  -->
            <v-col
              cols="12"
              sm="6"
              class="d-flex justify-end media"
            >
              <v-btn
                text="User Profile"
                class="border text-brown "
                variant="tonal"
                @click.stop
              ></v-btn>
            </v-col>
          </v-row>
          <!-- Name && Username -->
          <v-container class="border mb-2 rounded bg-mine">
            <v-row class="bordered-row">
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label>
                  Name
                </v-label>
                <p class="fw-bold">
                  {{ userObj.name }}
                </p>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label>
                  Username
                </v-label>
                <p class="fw-bold">
                  {{ userObj.username }}
                </p>
              </v-col>
            </v-row>
            <!-- Email and financial -->
            <v-row class="bordered-row">
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label>
                  Email
                </v-label>
                <p class="fw-bold">
                  {{ userObj.email }}
                </p>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label>
                  Financial
                </v-label>
                <p class="fw-bold">
                  {{ userObj.financial }}
                </p>
              </v-col>
            </v-row>
            <!-- Domain and userType -->
            <v-row class="bordered-row">
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label >
                  Domain
                </v-label>
                <p class="fw-bold">
                  PitsTrack
                </p>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label>
                  User Type
                </v-label>
                <p class="fw-bold">
                  {{ userObj.type }}
                </p>
              </v-col>
            </v-row>

            <!-- Roles -->
            <v-row class="">
              <v-col
                cols="12"
                sm="6"
                class="sm-center"
              >
                <v-label>
                  Roles
                </v-label>
                <div class="d-flex gap-2 fw-bold">
                  <p
                    v-for="role in userObj.roles"
                    :key="role"
                    class="bg-primary w-25 text-center rounded role-item"
                  >
                    {{ role }}
                  </p>
                </div>

              </v-col>
            </v-row>
          </v-container>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              class="d-flex justify-center"
            >
              <v-btn
                class="media-item w-100"
                text="Cancle"
                variant="tonal"
                @click="dialog = false"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-text>

      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog
      v-model="errorDialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>All fields must be filled correctly.</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="errorDialog = false"
          >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- Edit User -->
  <div
    class="text-center"
    v-if="$slots.EditUser"
  >
    <v-dialog
      v-model="dialog"
      max-width="700px"
      max-height="100vh"
      scrim="rgba(0, 0, 0, 0.7)"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          icon
          v-bind="activatorProps"
        >
          <slot name="EditUser">
            <v-icon>{{ icon }}</v-icon>
          </slot>
        </v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account-multiple-outline"
        title="User Profile"
      >
        <v-card-text>
          <v-row class="gap-0 mb-1">
            <!-- Name -->
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>
                Name
                <span
                  v-if="name"
                  style="color: red"
                >*</span>
              </v-label>
              <v-text-field v-model="name"></v-text-field>
            </v-col>

            <!-- Username Field -->
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>
                Username
                <span
                  v-if="!username"
                  style="color: red"
                >*</span>
                <span
                  v-if="usernameError"
                  style="color: red"
                >* (Letters, numbers, dashes, and underscores only)</span>
              </v-label>
              <v-text-field
                v-model="username"
                label="Ex:Ahmad_mohamed"
                required
                :rules="[ (v) => /^[a-zA-Z0-9-_]+$/.test(v) || 'Only letters, numbers, dashes, and underscores' ]"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Financial && Email Field -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Financial# </v-label>
              <v-text-field v-model="financial"></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Email
                <span
                  v-if="!email"
                  style="color: red"
                >*</span>
              </v-label>
              <v-text-field
                v-model="email"
                label="test@gmail.com"
                type="email"
                required
                :rules="[(v) => /.+@.+\..+/.test(v) || 'Invalid email format']"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Password Field with Strength Indicator -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Password <span
                  v-if="!password"
                  style="color: red"
                >*</span></v-label>
              <v-text-field
                v-model="password"
                :type="passwordVisible ? 'text' : 'password'"
                required
                :append-inner-icon="passwordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="togglePasswordVisibility"
                @input="checkPasswordStrength"
              ></v-text-field>
              <v-progress-linear
                v-model="passwordStrength"
                :color="passwordStrengthColor"
                :value="passwordStrength"
              ></v-progress-linear>
              <span :style="{ color: passwordStrengthColor }">{{ passwordStrengthMessage }}</span>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>Confirm Password
                <span
                  v-if="!confirmPassword"
                  style="color: red"
                >*</span>
              </v-label>
              <v-text-field
                v-model="confirmPassword"
                :type="passwordVisible ? 'text' : 'password'"
                required
                :append-inner-icon="passwordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="togglePasswordVisibility"
                @input="checkPasswordMatch"
              ></v-text-field>
              <v-progress-linear
                v-model="passwordMatchStrength"
                :color="passwordMatchColor"
                :value="passwordMatchStrength"
              ></v-progress-linear>
              <span :style="{ color: passwordMatchColor }">{{ passwordMatchMessage }}</span>
            </v-col>
          </v-row>

          <!-- User Type -->
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-label>User Type
                <span
                  v-if="!type"
                  style="color: red"
                >*</span>
              </v-label>
              <v-select
                v-model="type"
                :items="['tracking', 'testing', 'driving']"
                required
              ></v-select>
            </v-col>
          </v-row>

          <!-- Roles with Multiple Selection -->
          <v-row>
            <v-col cols="12">
              <v-label>Roles
                <span
                  v-if="Object.keys(roles).length === 0"
                  style="color: red"
                >*</span>
              </v-label>
              <v-autocomplete
                v-model="roles"
                :items="['Admin', 'User', 'Manager', 'HR']"
                label="Roles"
                auto-select-first
                multiple
                required
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="d-flex justify-start media"
            >
              <v-btn
                class="bg-red media-item"
                text="Cancel"
                variant="tonal"
                @click=" console.log(name) ,resetData() , dialog = false"
              ></v-btn>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="d-flex justify-end media"
            >
              <!-- here -->
              <v-btn
                class="bg-green media-item"
                text="Save"
                variant="tonal"
                @click="editUser"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog
      v-model="errorDialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>All fields must be filled correctly.</v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="errorDialog = false"
          >OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
  
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/UserPage/UsersStore.js'
let usersStore = useUsersStore()
const { icon, userObj = {} } = defineProps({
  icon: String,
  userObj: Object
})
import { defineEmits } from 'vue'

const emit = defineEmits(['editUser'])
const editUser = () => {
  const isValidEdit = password.value === confirmPassword.value
  if (!isValidEdit) {
    errorDialog.value = true
  } else {
    emit('editUser', {
      name: name.value,
      username: username.value,
      email: email.value,
      financial: financial.value,
      password: password.value,
      type: type.value,
      roles: roles.value
    })
    dialog.value = false
    errorDialog.value = false
  }
}
function resetData() {
  name.value = userObj.name || ''
  username.value = userObj.username || ''
  financial.value = userObj.financial || ''
  email.value = userObj.email || ''
  password.value = userObj.password || ''
  confirmPassword.value = userObj.password || ''
  type.value = userObj.type || ''
  roles.value = userObj.roles || []
}
const name = ref(userObj.name || '')
const username = ref(userObj.username || '')
const financial = ref(userObj.financial || '')
const email = ref(userObj.email || '')
const password = ref(userObj.password || '')
const confirmPassword = ref(userObj.password || '')
const passwordVisible = ref(false)
const type = ref(userObj.type || '')
const roles = ref(userObj.roles || [])

const dialog = ref(false)
const errorDialog = ref(false)

const passwordStrength = ref(0)
const passwordStrengthMessage = ref('')
const passwordStrengthColor = ref('white')

const passwordMatchStrength = ref(0)
const passwordMatchMessage = ref('')
const passwordMatchColor = ref('white')

function togglePasswordVisibility() {
  passwordVisible.value = !passwordVisible.value
}

function checkPasswordStrength() {
  const hasNumber = /[0-9]/.test(password.value)
  const hasLower = /[a-z]/.test(password.value)
  const hasUpper = /[A-Z]/.test(password.value)
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)

  if (password.value.length < 7) {
    passwordStrength.value = 25
    passwordStrengthColor.value = 'red'
  } else if (hasNumber && !hasLower && !hasUpper && !hasSymbol) {
    passwordStrength.value = 33
    passwordStrengthColor.value = 'red'
  } else if (!hasNumber && (hasLower || hasUpper) && !hasSymbol) {
    passwordStrength.value = 33
    passwordStrengthColor.value = 'red'
  } else if (hasNumber && (hasLower || hasUpper) && !hasSymbol) {
    passwordStrength.value = 66
    passwordStrengthColor.value = 'orange'
  } else if (hasNumber && (hasLower || hasUpper) && hasSymbol) {
    passwordStrength.value = 90
    passwordStrengthColor.value = 'green'
  }
}

function checkPasswordMatch() {
  passwordMatchMessage.value = ''
  const hasNumber = /[0-9]/.test(password.value)
  const hasLower = /[a-z]/.test(password.value)
  const hasUpper = /[A-Z]/.test(password.value)
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password.value)
  if (confirmPassword.value.length < 7 && password.value !== confirmPassword.value) {
    passwordMatchStrength.value = 25
    passwordMatchColor.value = 'red'
    passwordMatchMessage.value = 'Passwords do not match'
  } else if (
    hasNumber &&
    !hasLower &&
    !hasUpper &&
    !hasSymbol &&
    password.value !== confirmPassword.value
  ) {
    passwordMatchStrength.value = 33
    passwordMatchColor.value = 'red'
    passwordMatchMessage.value = 'Passwords do not match'
  } else if (
    !hasNumber &&
    (hasLower || hasUpper) &&
    !hasSymbol &&
    password.value !== confirmPassword.value
  ) {
    passwordMatchStrength.value = 33
    passwordMatchColor.value = 'red'
    passwordMatchMessage.value = 'Passwords do not match'
  } else if (
    hasNumber &&
    (hasLower || hasUpper) &&
    !hasSymbol &&
    password.value !== confirmPassword.value
  ) {
    passwordMatchStrength.value = 66
    passwordMatchColor.value = 'orange'
    passwordMatchMessage.value = 'Passwords do not match'
  } else if (
    hasNumber &&
    (hasLower || hasUpper) &&
    hasSymbol &&
    password.value !== confirmPassword.value
  ) {
    passwordMatchStrength.value = 90
    passwordMatchColor.value = 'green'
    passwordMatchMessage.value = 'Passwords do not match'
  }
}

function validateForm() {
  const isValid =
    name.value.length >= 3 &&
    /^[a-zA-Z0-9-_]+$/.test(username.value) &&
    /.+@.+\..+/.test(email.value) &&
    password.value.length >= 1 &&
    password.value === confirmPassword.value &&
    !!type.value &&
    roles.value.length > 0

  if (!isValid) {
    errorDialog.value = true
  } else {
    usersStore.addUser([
      [
        name.value,
        username.value,
        financial.value,
        email.value,
        password.value,
        type.value,
        roles.value
      ]
    ])
    name.value = ''
    username.value = ''
    financial.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    type.value = ''
    roles.value = []
    passwordMatchMessage.value = ''
    passwordMatchStrength.value = 0
    passwordStrength.value = 0

    dialog.value = false
  }
}
</script>
  
    <style scoped>
.text-center {
  text-align: center;
}
@media (max-width: 600px) {
  .media {
    display: flex !important;
    justify-content: center !important;
  }
  .media-item {
    width: 100% !important;
  }
  .sm-center {
    text-align: center !important;
  }
  .role-item {
    gap: 3px !important;
  }
}
.bordered-row {
  position: relative;
}
.bordered-row:after {
  position: absolute;
  content: '';
  border-bottom: 1px solid #d2d7da;
  width: 95%;
  transform: translateX(-50%);
  bottom: 0;
  left: 50%;
}
.bg-mine {
  background-color: #e4e8ea;
}
</style>
  