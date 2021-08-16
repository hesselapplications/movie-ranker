export default {
    props: {
        value: null
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(model) {
                this.$emit("input", model);
            }
        }
    }
};