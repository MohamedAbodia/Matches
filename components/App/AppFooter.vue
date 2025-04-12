<template>
  <footer class="border-t border-gray-200 py-4 dark:border-blue-400">
    <div
      class="flex flex-col items-center justify-between gap-2 text-center md:flex-row-reverse"
    >
      <AppLogo class="text-blue-300 dark:text-blue-200" />

      <div>
        <p>
          تصميم وبرمجة
          <span
            class="font-medium text-blue-300 transition-opacity duration-300 hover:cursor-default hover:opacity-80 dark:text-blue-200"
          >
            محمد محمود
          </span>
        </p>

        <p class="mt-1 text-xs">جميع الحقوق محفوظة 2022</p>

        <ul
          class="mt-1 flex items-center justify-center gap-2 text-sm [&>_li]:transition-colors"
        >
          <li class="hover:text-blue-300 dark:hover:text-blue-200">
            <NuxtLink
              href="https://www.muhammadmahmoud.com/"
              target="_blank"
              aria-label="Personal Website"
              rel="noreferrer noopener"
            >
              <Icon name="mdi:web" />
            </NuxtLink>
          </li>

          <li class="hover:text-blue-300 dark:hover:text-blue-200">
            <NuxtLink
              href="https://www.facebook.com/MuhammadM1998/"
              target="_blank"
              aria-label="Facebook"
              rel="noreferrer noopener"
            >
              <Icon name="uil:facebook-f" />
            </NuxtLink>
          </li>

          <li class="hover:text-blue-300 dark:hover:text-blue-200">
            <NuxtLink
              href="https://twitter.com/MuhammadM1998"
              target="_blank"
              aria-label="Twitter"
              rel="noreferrer noopener"
            >
              <Icon name="uil:twitter" />
            </NuxtLink>
          </li>

          <li class="hover:text-blue-300 dark:hover:text-blue-200">
            <NuxtLink
              href="https://www.linkedin.com/in/muhammadm1998/"
              target="_blank"
              aria-label="Linkedin"
              rel="noreferrer noopener"
            >
              <Icon name="uil:linkedin" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  .social-links {
    @apply flex items-center justify-center gap-2;

    li {
      @apply transition-colors;
    }
  }
</style>
