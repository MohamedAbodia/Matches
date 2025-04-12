<script setup>
  const { data, error } = await usePlaywright().fetchData();
</script>

<template>
  <section v-if="error" class="text-center [direction:rtl]">
    <BaseImg
      src="Data_Error"
      class="mx-auto mb-8"
      height="384"
      alt="Player holding a football in his hand"
    />

    <p class="text-lg font-semibold">
      حدث خطأ اثناء الحصول علي البيانات. نأسف لذلك وسنحاول إصلاح الخطأ في أسرع
      وقت!
    </p>
  </section>

  <section
    v-else-if="data.competitions.length === 0"
    class="text-center [direction:rtl]"
  >
    <BaseImg
      src="No_Matches"
      class="mx-auto mb-8"
      height="384"
      alt="Player holding a football in his hand"
    />

    <p class="text-lg font-semibold">
      لا توجد مباريات اليوم. حاول العودة لاحقاً.
    </p>
  </section>

  <section v-else class="flex flex-col gap-5 py-4">
    <CompetitionCard
      v-for="(competition, index) in data.competitions"
      :key="index"
      :competition="competition"
    />
  </section>
</template>
