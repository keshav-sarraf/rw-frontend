<template>
<div>
    <table class="table table-striped table-bordered align-middle">
        <thead>
            <tr>
                <th scope="col" class="text-center">Sl No.</th>
                <th scope="col" class="text-center"># digits</th>
                <th scope="col" class="text-center">Minimum Chain Length</th>
                <th scope="col" class="text-center">Maximum Chain Length</th>
                <th scope="col" class="text-center">Average Chain Length</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(stat, index) in stats" :key="stat.num_digits">
                <th scope="row">
                    {{index+1}}
                </th>
                <td>
                    {{stat.num_digits}}
                </td>
                <td>
                    {{stat.min_chain_length.len}}
                    <hr>
                    Sample Seed : {{stat.min_chain_length.seed}}
                </td>
                <td>
                    {{stat.max_chain_length.len}}
                    <hr>
                    Sample Seed : {{stat.max_chain_length.seed}}
                </td>
                <td>
                    {{stat.avg_chain_length.len}}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {
    ref,
} from 'vue';

import statsListJson from './middle_square_stats.json';

export default {
    setup() {
        const stats = ref(statsListJson.stats);

        return {
            stats
        }
    }
}
</script>
