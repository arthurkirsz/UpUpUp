Meteor.startup(function () {
  /**
   **Pour tous les changements, je considère que le schéma, et le comportement de l'app ont changés**

   Changements possibles:
    . Ajout d'un champ (obligatoire) -> Migration => Update des objets sans ce champ, avec une valeur par defaut.
    . Modifie (type...) un champ -> migration => Update des objets avec ce champ, en alterant le contenu et le transformant.
    . Supprime un champ -> migration (pas obligatoire mais mieux) => Retirer le champ de tous les objets qui l'ont
    . Ajoute une collection de relation -> migration
      => Créer la collection avec valeurs par defaut
      => faire **Ajout d'un champ (obligatoire)**
      => insérer les clés ids des colls par défaut dans le champ obligatoire ajouté
    . Ajout d'une nouvelle collection (pas de relation) -> pas de migration, elle sera créé au moment voulu
    . Supprime une collection -> migration (pas obligatoire, mais mieux)
      => (Si collection de relation) faire **Supprimer un champ** pour toutes les tables contenant le champ contenant l'id de la collection
      => Supprimer les collections
   */
  console.info("Migration startup")
});
