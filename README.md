## Getting Started

Add .env file in the root directory.with

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000/api
DATABASE_URL=my_sql_url
```

Run the development server:

```bash
npm run dev
npx prisma init
npx prisma generate
npx prisma migrate dev
```

## Approach

Using nextjs server side data fetching to get the task from the nextjs api. Tasks can be filter, search by title or description and by status. You can create a new task by clicking on the new task button which redirect to the new task page. After create a task the server side data revalidate using revalidate tag api which clear the cache and refetch the data upon visiting the tasks page. Same thing happening for edit task. For the details of the task, a parallel and intercepting route concept used to display sidebar on clicking details and on reload the page the url become same but the page will be changed so I will improve UX so user don't have to go and back to check details of every task.

## Deployed on Vercel

https://frontend-test-dusky.vercel.app/
