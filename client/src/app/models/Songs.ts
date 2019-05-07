// defines the objets that we want to use in the songs component

export class Songs {
  title: string;
  artist: string;
  genre: string;
  url: string;
  eventCode: number;
  votes: number;

  // Constructor class song
  constructor(
      title: string, artist: string, genre: string,
      url: string, votes?: number// the ? means is an optional attribute
  ) {
      this.title = title;
      this.artist = artist;
      this.genre = genre;
      this.url = url;
      this.votes = votes || 0;
  }

  // <--Methods Class Song-->

  // Method Autoincrement number of vote
   voteUp(): void {
      this.votes++;
   }

  // Method to split the url
  domain(): string {
          return this.url;
      }
}


