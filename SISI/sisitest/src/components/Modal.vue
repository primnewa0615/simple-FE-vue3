<template>
    <div class="overlay overflow-auto flex flex-col items-center justify-center">
        <div class="relative bg-white p-6 rounded-xl">
            <slot/>
        </div>
    </div>
</template>


<script lang="ts" setup>
    const props = defineProps({
        title: String,
    })
</script>

<style lang="css" scoped>
    .bottomsheet {
        font-size: 14px;
        max-height: 90%;
        box-shadow: 0px 8px 20px #0000004D;
        background-color: white;
        padding: 2rem;
        border-radius: 10px;
    }

    .title-modal {
        font: normal normal bold 20px/23px Roboto;
        letter-spacing: 0px;
        color: #464646;
        opacity: 1;
    }
</style>
