const firstNames = [
        `James`,
        `John`,
        `Robert`,
        `Michael`,
        `William`,
        `David`,
        `Richard`,
        `Joseph`,
        `Thomas`,
        `Charles`,
        `Mary`,
        `Patricia`,
        `Jennifer`,
        `Elizabeth`,
        `Linda`,
        `Barbara`,
        `Susan`,
        `Jessica`,
        `Margaret`,
        `Sarah`
      ],
      lastNames =[
        `Smith`,
        `Johnson`,
        `Williams`,
        `Jones`,
        `Brown`,
        `Davis`,
        `Miller`,
        `Wilson`,
        `Moore`,
        `Taylor`,
        `Anderson`,
        `Thomas`,
        `Elmore`
      ],
      cities = [
        `Washington`,
        `Springfield`,
        `Franklin`,
        `Greenville`,
        `Bristol`,
        `Clinton`,
        `Fairview`,
        `Salem`,
        `Madison`,
        `Georgetown`
      ],
      states = [
        `CA`,
        `TX`,
        `FL`,
        `NY`,
        `MO`,
        `KS`,
        `IL`
      ],
//      imageUrls = [
//        `https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a723711f2c79ac1dc3c8718d82850f30&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1475403614135-5f1aa0eb5015?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aa32268d819cd488975b3d92e88ab1bc&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1485274466491-6c0baa1cfc2a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a638b2b41d48f0bea0d5cf63f5cee011&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1440606797942-6cc04c045447?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e04b3b2e3c4aa4e1dc0dc1cde83dd862&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1506085452766-c330853bea50?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c90ef12b4dc22a4a4c277dd056dd0b7e&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fe4a823b6c32e6f9002f005d174a106b&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1449614115178-cb924f730780?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e1688fdb712642dc541e53dd5f0a1a1a&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1511546395756-590dffdcdbd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fb6c2fb68225c3cfac850fdf4a4cee25&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a0f994eef47e5fb1a67849703cc961b3&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1503593245033-a040be3f3c82?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6377c4ad91dd5c06bd7e68121329ceaa&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1421772712538-0cb9171fc9e4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5ff504bc3824588f1970791d90248c8b&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1505551815015-9742d2cfb084?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5e729a3eb66f65cc82d926a25f10b66a&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1440178536296-c1041e136dda?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad41fe77affb9b099e1c7d800b678f97&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad57f7ca5832f3f72ee2c1c243c72f5c&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1458071103673-6a6e4c4a3413?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f710e5314d91b9bb162e017463495c54&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=361907f0deaaf183ac4ce6b62551dfb3&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1504683706615-c26f923422f3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2172dfa65ece30882629b3d7d175ee68&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1440508319978-8b67875e39d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=07a8449afdd01581187dde74ac322a06&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d702cb99ca804bffcfa8820c46483264&auto=format&fit=crop&w=800&q=60`,
//        `https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=800&q=60`
//      ],
      imageUrls = [
        `../images/users/m1.jpg`,
        `../images/users/m2.jpg`,
        `../images/users/m3.jpg`,
        `../images/users/m4.jpg`,
        `../images/users/m5.jpg`,
        `../images/users/m6.jpg`,
        `../images/users/m7.jpg`,
        `../images/users/m8.jpg`,
        `../images/users/m9.jpg`,
        `../images/users/m10.jpg`,
        `../images/users/w1.jpg`,
        `../images/users/w2.jpg`,
        `../images/users/w3.jpg`,
        `../images/users/w4.jpg`,
        `../images/users/w5.jpg`,
        `../images/users/w6.jpg`,
        `../images/users/w7.jpg`,
        `../images/users/w8.jpg`,
        `../images/users/w9.jpg`,
        `../images/users/w10.jpg`      
      ],
      lorem = [
        `I'm nobody's taxi service; I'm not gonna be there to catch you every time you feel like jumping out of a spaceship. I'm the Doctor, I'm worse than everyone's aunt. *catches himself* And that is not how I'm introducing myself.`,
        `The way I see it, every life is a pile of good things and bad things.…hey.…the good things don't always soften the bad things; but vice-versa the bad things don't necessarily spoil the good things and make them unimportant. Sorry, checking all the water in this area; there's an escaped fish.`,
        `They're not aliens, they're Earth…liens! I'm the Doctor. Well, they call me the Doctor. I don't know why. I call me the Doctor too. I still don't know why. Father Christmas. Santa Claus. Or as I've always known him: Jeff.`,
        `All I've got to do is pass as an ordinary human being. Simple. What could possibly go wrong? Heh-haa! Super squeaky bum time! They're not aliens, they're Earth…liens! No… It's a thing; it's like a plan, but with more greatness.`,
        `You know when grown-ups tell you 'everything's going to be fine' and you think they're probably lying to make you feel better? You know when grown-ups tell you 'everything's going to be fine' and you think they're probably lying to make you feel better?`,
        `It's a fez. I wear a fez now. Fezes are cool. I am the last of my species, and I know how that weighs on the heart so don't lie to me! You know when grown-ups tell you 'everything's going to be fine' and you think they're probably lying to make you feel better?`,
        `Heh-haa! Super squeaky bum time! Sorry, checking all the water in this area; there's an escaped fish. You know when grown-ups tell you 'everything's going to be fine' and you think they're probably lying to make you feel better?`,
        `It's art! A statement on modern society, 'Oh Ain't Modern Society Awful?'! They're not aliens, they're Earth…liens! No… It's a thing; it's like a plan, but with more greatness. You hit me with a cricket bat.`,
        `Saving the world with meals on wheels. Annihilate? No. No violence. I won't stand for it. Not now, not ever, do you understand me?! I'm the Doctor, the Oncoming Storm - and you basically meant beat them in a football match, didn't you?`,
        `Guy's a pro. Did you enjoy your meal, Mom? You drank it fast enough. No, I did not kill Kitty. However, I am going to oblige and answer the nice officer's questions because I am an honest man with no secrets to hide.`,
        `Not tricks, Michael, illusions. Steve Holt! Bad news. Andy Griffith turned us down. He didn't like his trailer. Marry me.`,
        `Guy's a pro. That's why you always leave a note! Well, what do you expect, mother? I don't criticize you! And if you're worried about criticism, sometimes a diet is the best defense. Well, what do you expect, mother?`,
        `I care deeply for nature. I'm afraid I just blue myself. Steve Holt! Really? Did nothing cancel? I'm half machine. I'm a monster.`,
        `I don't criticize you! And if you're worried about criticism, sometimes a diet is the best defense. Across from where? I'm afraid I just blue myself. Really? Did nothing cancel?`,
        `I care deeply for nature. That's what it said on 'Ask Jeeves.' There's only one man I've ever called a coward, and that's Brian Doyle Murray. No, what I'm calling you is a television actor. Marry me. Whoa, this guy's straight?`,
        `But I bought a yearbook ad from you, doesn't that mean anything anymore? Whoa, this guy's straight? Now, when you do this without getting punched in the chest, you'll have more fun. Really? Did nothing cancel?`,
        `Army had half a day. There's only one man I've ever called a coward, and that's Brian Doyle Murray. No, what I'm calling you is a television actor. Bad news. Andy Griffith turned us down. He didn't like his trailer.`,
        `OK, this has gotta stop. I'm going to remind Fry of his humanity the way only a woman can. No! The cat shelter's on to me. I could if you hadn't turned on the light and shut off my stereo. I just want to talk. It has nothing to do with mating. Fry, that doesn't make sense.`,
        `Robot 1-X, save my friends! And Zoidberg! I'm just glad my fat, ugly mama isn't alive to see this day. I don't want to be rescued. And why did 'I' have to take a cab? Oh, how I wish I could believe or understand that! There's only one reasonable course of action now: kill Flexo!`,
        `Isn't it true that you have been paid for your testimony? I never loved you. Stop it, stop it. It's fine. I will 'destroy' you! I'm Santa Claus! Leela's gonna kill me. Yeah, lots of people did.`,
        `I found what I need. And it's not friends, it's things. Look, everyone wants to be like Germany, but do we really have the pure strength of 'will'? I love you, buddy! How much did you make me? Yeah, I do that with my stupidness.`,
        `Bender, we're trying our best. Son, as your lawyer, I declare y'all are in a 12-piece bucket o' trouble. But I done struck you a deal: Five hours of community service cleanin' up that ol' mess you caused.`,
        `You can see how I lived before I met you. Also Zoidberg. Yes, if you make it look like an electrical fire. When you do things right, people won't be sure you've done anything at all. We don't have a brig.`,
        `Are you crazy? I can't swallow that. You're going back for the Countess, aren't you? Good news, everyone! There's a report on TV with some very bad news! If rubbin' frozen dirt in your crotch is wrong, hey I don't wanna be right.`,
        `Why would I want to know that? Kids don't turn rotten just from watching TV. Ooh, name it after me! Can I use the gun? And I'm his friend Jesus.`,
        `And remember, don't do anything that affects anything, unless it turns out you were supposed to, in which case, for the love of God, don't not do it! Yes, if you make it look like an electrical fire. When you do things right, people won't be sure you've done anything at all.`,
        `We don't have a brig. This opera's as lousy as it is brilliant! Your lyrics lack subtlety. You can't just have your characters announce how they feel. That makes me feel angry! I'll tell them you went down prying the wedding ring off his cold, dead finger.`,
        `Perhaps, but perhaps your civilization is merely the sewer of an even greater society above you! Well, thanks to the Internet, I'm now bored with sex. Is there a place on the web that panders to my lust for violence?`,
        `I love this planet! I've got wealth, fame, and access to the depths of sleaze that those things bring. Good news, everyone! I've taught the toaster to feel love! File not found. A sexy mistake. I'm just glad my fat, ugly mama isn't alive to see this day.`,
        `You, a bobsleder!? That I'd like to see! There's one way and only one way to determine if an animal is intelligent. Dissect its brain! I guess because my parents keep telling me to be more ladylike. As though!`,
        `Belligerent and numerous. Of all the friends I've had… you're the first. I feel like I was mauled by Jesus. Leela, are you alright? You got wanged on the head. There, now he's trapped in a book I wrote: a crummy world of plot holes and spelling errors!`,
        `No, just a regular mistake. I decline the title of Iron Cook and accept the lesser title of Zinc Saucier, which I just made up. Uhh… also, comes with double prize money. No! Don't jump! And from now on you're all named Bender Jr.`
      ];

function random(arr) {
  let rando = Math.floor(Math.random() * arr.length);
  return arr[rando];
}

function multiRandom(arr, qty) {
  let block;
  for(q of qty) {
    block += random(arr);
  }
  return block;
}

class User {
  constructor(fname, image) {
    this.firstName = fname;
    this.lastName = random(lastNames);
    this.city = random(cities);
    this.state = random(states);
    this.image = image;
    this.imageAlt = `A photo of ${this.firstName, this.lastName}`;
  }
}

function seedUser(i) {
  window.location.href = `http://localhost:3000/logout`;
  let user = new User(firstNames[i], imageUrls[i]);
  let username = firstNames[i];
  let password = `password`;
  let description = random(lorem);
  post(`/users`, {
    'user[firstName]': user.firstName,
    'user[lastName]': user.lastName,
    'user[city]': user.city,
    'user[state]': user.state,
    'user[image]': user.image,
    'user[imageAlt]': user.imageAlt,
    username: username,
    password: 'password',
    description: description 
  });
}

function post(path, params, method = `post`) {
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            console.log(hiddenField);
            form.appendChild(hiddenField);
        }
    }
    document.body.appendChild(form);
    form.submit();
}