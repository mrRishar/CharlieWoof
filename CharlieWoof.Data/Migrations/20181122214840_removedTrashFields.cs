using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class removedTrashFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Har",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsEmailadayType",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsGlobalDeactivate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsMarketingAllowed",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsRdrQualificationsCorrect",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsRdrStudyQualificationsCorrect",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsSendNewsletter",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ShowMobile",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Har",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IsEmailadayType",
                table: "Users",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsGlobalDeactivate",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsMarketingAllowed",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRdrQualificationsCorrect",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsRdrStudyQualificationsCorrect",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSendNewsletter",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ShowMobile",
                table: "Users",
                nullable: false,
                defaultValue: false);
        }
    }
}
