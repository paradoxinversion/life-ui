LifeUI is a small web app to help organize things, set up small todo's, etc.

LifeUI is based on simple elements: Fields and Lists.

Fields are as you you expect: form fields the user can interact with and modify.

Lists are Arrays of Objects who's objects follow pattern below:

```
{
  id: [guid],
  itemData: [Object]
}
```
`Bookmark`
```
[
  {
    "id":"1573870654351MI61ZsGL",
    "itemData":"https://paradoxinversion.com"
  }
]
```
`Todo`

```
[
  {
    "id":"1571700012034wWDKRHrs",
    "itemData":{
      "text":"to the thing",
      "isDone":false
    }
  },
  {
    "id":"1573870631336fgW9G4VW",
    "itemData":{
      "text":"do another thing",
      "isDone":true
    }
  }
]
``

The data structure of `itemData` changes depending on what type of items are in the list.

Solid Goals:

- Utilize only the client so anyone with an internet connection can instantly use it

Lofty Goals:

- Make this an executable application (via electron?)

Planned Features:

- to do list
- notepad
- bookmark list

Maybe nice to have features:

- third party feeds
- timers (like, pomodoro timers)