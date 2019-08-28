using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CharlieWoof.Data.Migrations
{
    public partial class AddedMagicContentItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MagicContentItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false, defaultValueSql: "(newid())"),
                    UpdatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    CreatedOnUtc = table.Column<DateTime>(type: "datetime", nullable: false),
                    UpdatedByUserId = table.Column<Guid>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    Title = table.Column<string>(maxLength: 250, nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Content = table.Column<string>(nullable: false),
                    Icon = table.Column<string>(maxLength: 500, nullable: false),
                    Css = table.Column<string>(maxLength: 250, nullable: false),
                    Color = table.Column<string>(maxLength: 250, nullable: false),
                    Image = table.Column<string>(maxLength: 250, nullable: false),
                    MagicPageId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MagicContentItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MagicContentItems_MagicPages_MagicPageId",
                        column: x => x.MagicPageId,
                        principalTable: "MagicPages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MagicContentItems_MagicPageId",
                table: "MagicContentItems",
                column: "MagicPageId");

            migrationBuilder.CreateIndex(
                name: "IX_MagicContentItems_UpdatedByUserId",
                table: "MagicContentItems",
                column: "UpdatedByUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MagicContentItems");
        }
    }
}
