<script>
import dayjs from 'dayjs'

export default {
    setup() {
        const formattedMonth = dayjs(new Date()).format('YYYY年MM月')
        
        return {
            formattedMonth
        }
    }
}
</script>