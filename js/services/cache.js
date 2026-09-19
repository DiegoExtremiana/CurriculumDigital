export function createCache(key) {
    return {
        read() {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return null;
            }
        },

        write(value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch {
                // sin localStorage o sin espacio, no es crítico
            }
        }
    };
}
