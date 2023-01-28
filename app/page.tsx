import CountdownContainer from "#/components/CountdownContainer";

export default async function Home() {
  console.log({
    todo: [
      'stimulate your own result',
      'compare that to others',
      'save it',
      'share it',
    ],
  });
  return (
    <main className="page full-page index-page">
       <CountdownContainer /> 
      
    </main>
  );
}
