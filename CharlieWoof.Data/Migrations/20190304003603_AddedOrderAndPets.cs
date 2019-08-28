using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class AddedOrderAndPets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Birthday",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Feedback",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Street",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(nullable: false),
                    Price = table.Column<double>(nullable: false),
                    Services = table.Column<byte>(type: "tinyint", nullable: false),
                    Status = table.Column<byte>(type: "tinyint", nullable: false),
                    Data = table.Column<DateTime>(type: "datetime", nullable: false),
                    PetId = table.Column<Guid>(nullable: false),
                    UserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pets",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Breed = table.Column<string>(maxLength: 250, nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime", nullable: false),
                    Note = table.Column<string>(nullable: false),
                    Image = table.Column<string>(maxLength: 500, nullable: false),
                    OwnerUserId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pets", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UpdatedByUserId",
                table: "Orders",
                column: "UpdatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Pets_UpdatedByUserId",
                table: "Pets",
                column: "UpdatedByUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Pets");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Feedback",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Street",
                table: "Users");
        }
    }
}
