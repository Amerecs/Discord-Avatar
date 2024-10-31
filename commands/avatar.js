const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Get the avatar of a user.")
        .addUserOption(option => option.setName("user").setDescription("The user to get the avatar of.").setRequired(false)),
        
    async execute(client, interaction) {
        const user = interaction.options.getUser("user") || interaction.user;

        const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });
        
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(client.user.displayName, client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`**${user.displayName}**`)
            .setImage(avatarUrl)
            .setURL(avatarUrl)
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });
    },
};
