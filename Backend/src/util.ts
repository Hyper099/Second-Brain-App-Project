function hashedShareLink(): string {
   let hash = "";
   const pat = '1234567890qwertyuiopasdfghjkl;xcvbnm,';

   for (let i = 0; i < pat.length; i++) {
      const randomIndex = Math.floor(Math.random() * pat.length);
      hash += pat[randomIndex];
   }

   return hash;
}

export default hashedShareLink;