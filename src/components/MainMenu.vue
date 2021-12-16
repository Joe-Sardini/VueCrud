<template>
    <div>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/videogames" class="nav-link">Video Games</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/addvideogame" class="nav-link">Add Video Game</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/steamgameslist" class="nav-link">Steam</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/cheapshark" class="nav-link">Cheap Shark</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/steamgames" class="nav-link">Steam Games</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/emulatorgames" class="nav-link">Emulator Games</router-link>
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