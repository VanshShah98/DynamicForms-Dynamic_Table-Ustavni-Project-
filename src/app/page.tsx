// pages/index.tsx
import ExamplePage from './teacher/component/ExampleData';
import StudentForm from './teacher/component/StudentForm';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Dynamic Table Example</h1>
      <StudentForm />
      <ExamplePage/>
    </div>
  );
};

export default Home;
