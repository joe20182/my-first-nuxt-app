<template>
    <div>
        <TheHeader @sidenavToggle="toggleNav = !toggleNav"/>
        <TheSidenav :show="toggleNav" @close="toggleNav = false"/>
        <nuxt />
    </div>
</template>

<script>
import TheHeader from '@/components/navigation/TheHeader'
import TheSidenav from '@/components/navigation/TheSidenav'

export default {
    components: {
        TheHeader,
        TheSidenav
    },
    data() {
        return {
            toggleNav: false
        }
    }
}
</script>
