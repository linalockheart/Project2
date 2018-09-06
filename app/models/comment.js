

module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {
        fbUserId: DataTypes.STRING,
        fbUserDisplayName: DataTypes.STRING,
        fsVenueId: DataTypes.STRING,
        body: DataTypes.STRING,
    });
  
    // Comment.associate = function(models) {
    //   // We're saying that a Post should belong to an Author
    //   // A Post can't be created without an Author due to the foreign key constraint
    //   Comment.belongsTo(models.User, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });

    //   Comment.belongsTo(models.Venue, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    // });

  return Comment;
}


