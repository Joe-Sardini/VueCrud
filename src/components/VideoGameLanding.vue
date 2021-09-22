<template>
    <div>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">Nova</router-link>
            <div class="navbar-nav mr-auto">
                <li class="nav-item">
                <router-link to="/add" class="nav-link">Add</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/videogames" class="nav-link">Video Games</router-link>
                </li>
                <li class="nav-item">
                <router-link to="/addvideogame" class="nav-link">Add Video Game</router-link>
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