import { ToDoList } from "@/components/ToDoList";
import { AddToDoForm } from "@/components/AddToDoForm";
import { Controls } from "@/components/Controls";
import { StoreProvider } from "@/shared/providers";
import styles from "./page.module.css";

interface HomeProps {
  searchParams: { filter: "all" | "active" | "finished" | null };
}

const Home = (props: HomeProps) => {
  const { searchParams } = props;

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <StoreProvider>
          <h1 className={styles.title}>Todos</h1>
          <AddToDoForm />
          <Controls filter={searchParams.filter} />
          <ToDoList filter={searchParams.filter} />
        </StoreProvider>
      </div>
    </div>
  );
};

export default Home;
