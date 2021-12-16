<template>
    <div>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Emulator</router-link>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                <router-link to="/add" class="nav-link">Add</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/emulatorgames" class="nav-link">Emulator Games</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/addemulatorgame" class="nav-link">Add Emulator Game</router-link>
                </li>
            </div>
        </nav>
        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>