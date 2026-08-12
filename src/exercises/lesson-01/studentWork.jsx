//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'Dante';
  const age = 21;
  const hobbies = ['Bowling', 'Video Games', 'Coding'];

  return (
    <div>
      <h2>About me:</h2>
      <p>
        My name is Amaya but my preferred name is Dante. I am 21 years old and I
        have one pet, a Bearded Dragon named Mojave. I am a military veteran, I
        served in the U.S. Army as a wheeled vehicle mechanic. I have been
        coding for around 6 years, a mix of both personal and class experience,
        but it was all mostly focused in Cybersecurity, although I got some
        JavaScript coding experience in High School. I currently am switching
        pathways and taking the Software Engineering path instead.
      </p>

      <ul>
        <li>Bowling</li>
        <li>Coding</li>
        <li>Video Games</li>
      </ul>
    </div>
  );
}
